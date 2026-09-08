# Backend Updates for Local Image Gallery

## Overview

The auction model needs to return an array of local image paths (`/public/images/lots/<category>/*.jpg`) alongside the existing `imageUrl` field.

## Step 1: Update Domain Model

File: `OnlineAuctionSystem.Domain/Entities/Auction.cs`

```csharp
public class Auction
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    
    // Existing field - keep for backward compatibility
    public string? ImageUrl { get; set; }
    
    // NEW: Local gallery images downloaded from Unsplash
    // Maps to /public/images/lots/<category>/1.jpg through 10.jpg
    public List<string>? Images { get; set; }
    
    public decimal StartingPrice { get; set; }
    public decimal CurrentHighestBid { get; set; }
    public DateTime EndTime { get; set; }
    public AuctionStatus Status { get; set; }
    public string SellerId { get; set; }
    public string? CategoryName { get; set; }
    public string? WinnerId { get; set; }
    
    // ... other properties
}
```

## Step 2: Update DTO

File: `OnlineAuctionSystem.Application/DTOs/AuctionDto.cs`

```csharp
public class AuctionDto
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    
    // Existing
    public string? ImageUrl { get; set; }
    
    // NEW: Array of local images
    public List<string>? Images { get; set; }
    
    public decimal StartingPrice { get; set; }
    public decimal CurrentHighestBid { get; set; }
    public DateTime EndTime { get; set; }
    public string Status { get; set; }
    public string SellerId { get; set; }
    public string SellerName { get; set; }
    public string? CategoryName { get; set; }
    public string? WinnerName { get; set; }
}

// List item DTO (lightweight, used in grids)
public class AuctionListItemDto
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string? ImageUrl { get; set; }
    public List<string>? Images { get; set; }  // NEW
    public decimal CurrentHighestBid { get; set; }
    public DateTime EndTime { get; set; }
    public string Status { get; set; }
    public string SellerId { get; set; }
    public string? CategoryName { get; set; }
}
```

## Step 3: Mapping Configuration

File: `OnlineAuctionSystem.Application/Mappings/MappingProfile.cs`

```csharp
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Auction to DTO
        CreateMap<Auction, AuctionDto>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
            .ForMember(dest => dest.SellerName, opt => opt.MapFrom(src => src.Seller.Username))
            .ForMember(dest => dest.WinnerName, opt => opt.MapFrom(src => src.Winner != null ? src.Winner.Username : null))
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
            // NEW: Map Images collection
            .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images != null ? src.Images : new List<string>()));

        CreateMap<Auction, AuctionListItemDto>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
            // NEW: Map Images collection
            .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images != null ? src.Images : new List<string>()));
    }
}
```

## Step 4: Populate Images in Seeder

File: `OnlineAuctionSystem.Persistence/Seed/DatabaseSeeder.cs`

```csharp
// Add this method to DatabaseSeeder
private static List<string> GetGalleryImages(string categoryName)
{
    // Map category to gallery folder
    var categoryToFolder = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
    {
        { "Electronics", "electronics" },
        { "Collectibles", "ancient-coins" },
        { "Art", "auction-hero" },
        { "Fashion", "rayban-sunglasses" },
        { "Home & Garden", "ancient-coins" },
        { "Sports", "baseball-glove" },
    };

    string folder = categoryToFolder.TryGetValue(categoryName, out var f) ? f : "electronics";
    var images = new List<string>();

    for (int i = 1; i <= 10; i++)
    {
        images.Add($"/images/lots/{folder}/{i}.jpg");
    }

    return images;
}

// In SeedAsync, when creating auctions:
new Auction
{
    Title = "Apple AirPods Pro (2nd Generation)",
    Description = "...",
    ImageUrl = "https://images.unsplash.com/...",  // Keep for compatibility
    Images = GetGalleryImages("Electronics"),       // NEW
    StartingPrice = 200m,
    EndTime = DateTime.UtcNow.AddDays(1),
    Status = AuctionStatus.Active,
    SellerId = seller.Id,
    CategoryId = electronics.Id,
}
```

## Step 5: Database Migration (if using EF Core)

```bash
dotnet ef migrations add AddAuctionImages --project OnlineAuctionSystem.Persistence

# Review the generated migration, then apply it:
dotnet ef database update --project OnlineAuctionSystem.Persistence
```

If the migration is auto-generated with a JSON column, that's fine. SQL Server will handle List<string> as JSON.

## Step 6: Verify the API Response

After updates, call:
```
GET /api/auctions?page=1&pageSize=8
```

Should return something like:
```json
{
  "id": "...",
  "title": "Apple AirPods Pro (2nd Generation)",
  "imageUrl": "https://images.unsplash.com/...",
  "images": [
    "/images/lots/airpods/1.jpg",
    "/images/lots/airpods/2.jpg",
    ...
  ],
  "currentHighestBid": 230.50,
  "endTime": "2026-09-08T...",
  "status": "Active",
  "categoryName": "Electronics"
}
```

## Step 7: Serve Images in Development

Images are served from `/public/` folder by Vite:
- File: `/public/images/lots/airpods/1.jpg`
- URL: `http://localhost:5173/images/lots/airpods/1.jpg`

In production, copy `/public/images/` to your static file server.

## Backward Compatibility

- Existing `imageUrl` field remains unchanged
- New `Images` field is optional (nullable)
- Frontend checks `Images` first, falls back to `imageUrl`
- Clients using old API response still work

## Testing

Frontend will automatically handle:
1. `images` array present → show gallery
2. `images` empty, `imageUrl` present → show single image
3. Both empty → show placeholder

No additional frontend changes needed if you follow this backend setup!
