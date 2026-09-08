import React, { useState, useEffect } from 'react';

/**
 * Premium Auction House - Showcase Component
 * Features: Real Unsplash URLs, SignalR Simulation, AI Verification
 */

// Mock auction data with stable Unsplash URLs
const MOCK_AUCTIONS = [
  {
    id: 1,
    title: "Retro Nintendo Entertainment System (NES)",
    category: "electronics",
    startingPrice: 300.00,
    image_url: "https://images.unsplash.com/photo-1595225476474-11a278e80207?w=600&q=80"
  },
  {
    id: 2,
    title: "Vintage Baseball Glove - Rawlings Professional",
    category: "sports",
    startingPrice: 180.00,
    image_url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80"
  },
  {
    id: 3,
    title: "Vintage Canon AE-1 35mm Film Camera",
    category: "electronics",
    startingPrice: 150.00,
    image_url: "https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=600&q=80"
  },
  {
    id: 4,
    title: "Omega Speedmaster Professional Chronograph",
    category: "collectibles",
    startingPrice: 3900.00,
    image_url: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80"
  },
  {
    id: 5,
    title: "Designer Sunglasses - Ray-Ban Vintage",
    category: "fashion",
    startingPrice: 120.00,
    image_url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80"
  },
  {
    id: 6,
    title: "Nike Running Shoes - Rare Vintage Edition",
    category: "sports",
    startingPrice: 250.00,
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"
  },
  {
    id: 7,
    title: "Rare Ancient Coin Collection - Roman Empire",
    category: "collectibles",
    startingPrice: 800.00,
    image_url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80"
  },
  {
    id: 8,
    title: "Van Gogh Starry Night - Museum Print",
    category: "art",
    startingPrice: 180.00,
    image_url: "https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=600&q=80"
  }
];

// AI Verification expert opinions by category
const AI_VERIFICATION_DATA = {
  electronics: "✓ Authenticity Verified\n\nSerial number matches manufacturer database. Electronics components show legitimate manufacturing patterns. PCB soldering technique consistent with 1980s production standards. Estimated authenticity confidence: 98%.",
  sports: "✓ Authenticity Verified\n\nLeather composition matches professional-grade specifications. Stitch patterns consistent with Rawlings proprietary sewing technique. Wear patterns indicate authentic use. Estimated authenticity confidence: 96%.",
  collectibles: "✓ Authenticity Verified\n\nMint marks align with historical records. Patina oxidation patterns consistent with Roman-era metallurgy. Weight and dimensions match numismatic standards. Estimated authenticity confidence: 99%.",
  fashion: "✓ Authenticity Verified\n\nFrame construction matches vintage Ray-Ban specifications. Lens coatings show period-appropriate degradation. Hinge mechanisms operate with authentic mechanical precision. Estimated authenticity confidence: 97%.",
  art: "✓ Authenticity Verified\n\nPaper composition analyzed for period accuracy. Print halftone patterns consistent with museum reproduction standards. Color fidelity matches Van Gogh's original palette. Estimated authenticity confidence: 94%."
};

export default function AuctionCard() {
  const [currentAuctionIndex, setCurrentAuctionIndex] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(MOCK_AUCTIONS[0].startingPrice);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiVerification, setAiVerification] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);

  const auction = MOCK_AUCTIONS[currentAuctionIndex];

  // ========== SignalR Simulation ==========
  useEffect(() => {
    const intervalId = setInterval(() => {
      // 30% chance to increase price
      if (Math.random() < 0.3) {
        const priceIncrease = Math.random() * 50 + 10; // $10-$60 increase
        setCurrentPrice(prev => {
          const newPrice = parseFloat((prev + priceIncrease).toFixed(2));
          setBidHistory(prev => [...prev, {
            time: new Date().toLocaleTimeString(),
            amount: newPrice
          }].slice(-5)); // Keep last 5 bids
          console.log(`📊 New bid received: $${newPrice} (SignalR simulation)`);
          return newPrice;
        });
      }
    }, 4000 + Math.random() * 2000); // 4-6 seconds

    return () => clearInterval(intervalId);
  }, []);

  // ========== AI Verification Handler ==========
  const handleAIVerification = async () => {
    setIsLoadingAI(true);
    setAiVerification(null);
    
    // Simulate AI processing delay (1.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const verification = AI_VERIFICATION_DATA[auction.category] || AI_VERIFICATION_DATA.collectibles;
    setAiVerification(verification);
    setIsLoadingAI(false);
    console.log(`🤖 AI Verification complete for: ${auction.title}`);
  };

  // ========== Navigation ==========
  const goToNextAuction = () => {
    const nextIndex = (currentAuctionIndex + 1) % MOCK_AUCTIONS.length;
    setCurrentAuctionIndex(nextIndex);
    setCurrentPrice(MOCK_AUCTIONS[nextIndex].startingPrice);
    setAiVerification(null);
    setBidHistory([]);
  };

  const goToPreviousAuction = () => {
    const prevIndex = currentAuctionIndex === 0 ? MOCK_AUCTIONS.length - 1 : currentAuctionIndex - 1;
    setCurrentAuctionIndex(prevIndex);
    setCurrentPrice(MOCK_AUCTIONS[prevIndex].startingPrice);
    setAiVerification(null);
    setBidHistory([]);
  };

  // ========== Styles ==========
  const styles = {
    container: {
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '"Inter", "Fraunces", sans-serif',
      backgroundColor: '#1a1a1a',
      minHeight: '100vh',
      color: '#e8e8e8'
    },
    card: {
      backgroundColor: '#242424',
      borderRadius: '12px',
      border: '1px solid #444444',
      overflow: 'hidden',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.32)'
    },
    imageContainer: {
      position: 'relative',
      paddingBottom: '100%',
      backgroundColor: '#1a1a1a',
      overflow: 'hidden'
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      backgroundColor: '#333333'
    },
    badgeContainer: {
      position: 'absolute',
      top: '12px',
      left: '12px',
      display: 'flex',
      gap: '8px',
      zIndex: 2
    },
    badge: {
      backgroundColor: 'rgba(192, 169, 117, 0.9)',
      color: '#1a1a1a',
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    content: {
      padding: '20px'
    },
    category: {
      fontSize: '12px',
      color: '#c0a975',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '8px',
      fontWeight: '600'
    },
    title: {
      fontSize: '18px',
      fontWeight: '700',
      margin: '12px 0',
      lineHeight: '1.3',
      color: '#ffffff'
    },
    priceSection: {
      backgroundColor: '#1a1a1a',
      padding: '16px',
      borderRadius: '8px',
      marginTop: '16px',
      marginBottom: '16px'
    },
    priceLabel: {
      fontSize: '12px',
      color: '#909090',
      textTransform: 'uppercase',
      marginBottom: '6px'
    },
    priceValue: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#c0a975',
      fontFamily: '"IBM Plex Mono", monospace'
    },
    priceChange: {
      fontSize: '12px',
      color: '#4c9a6b',
      marginTop: '4px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      marginTop: '16px'
    },
    button: {
      flex: 1,
      padding: '12px 16px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    aiButton: {
      backgroundColor: '#c0a975',
      color: '#1a1a1a'
    },
    aiButtonHover: {
      backgroundColor: '#d4bb8a',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(192, 169, 117, 0.2)'
    },
    navButton: {
      backgroundColor: '#333333',
      color: '#e8e8e8',
      fontSize: '12px'
    },
    navButtonHover: {
      backgroundColor: '#444444',
      transform: 'translateY(-2px)'
    },
    aiVerificationContainer: {
      backgroundColor: '#2a2a2a',
      padding: '16px',
      borderRadius: '8px',
      marginTop: '16px',
      border: '1px solid #c0a975',
      minHeight: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    aiVerificationText: {
      fontSize: '13px',
      lineHeight: '1.6',
      color: '#c0c4bc',
      whiteSpace: 'pre-wrap',
      fontFamily: '"IBM Plex Mono", monospace'
    },
    spinner: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '2px solid #c0a975',
      borderTop: '2px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    bidHistory: {
      marginTop: '16px',
      padding: '12px',
      backgroundColor: '#1a1a1a',
      borderRadius: '8px',
      fontSize: '12px'
    },
    bidHistoryTitle: {
      color: '#c0a975',
      marginBottom: '8px',
      fontWeight: '600'
    },
    bidItem: {
      color: '#909090',
      padding: '4px 0',
      display: 'flex',
      justifyContent: 'space-between'
    },
    navigation: {
      display: 'flex',
      gap: '8px',
      marginTop: '20px',
      justifyContent: 'center'
    },
    auctionCounter: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '14px',
      color: '#909090'
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        button:hover {
          transform: translateY(-2px);
        }
      `}</style>

      <div style={styles.card}>
        {/* Image Section */}
        <div style={styles.imageContainer}>
          <img 
            src={auction.image_url}
            alt={auction.title}
            style={styles.image}
            onError={(e) => {
              e.target.style.backgroundColor = '#333333';
            }}
          />
          <div style={styles.badgeContainer}>
            <span style={styles.badge}>Premium</span>
            <span style={styles.badge}>{auction.category}</span>
          </div>
        </div>

        {/* Content Section */}
        <div style={styles.content}>
          <div style={styles.category}>{auction.category}</div>
          
          <h2 style={styles.title}>{auction.title}</h2>

          {/* Price Display */}
          <div style={styles.priceSection}>
            <div style={styles.priceLabel}>Current Bid (SignalR Live Update)</div>
            <div style={styles.priceValue}>${currentPrice.toFixed(2)}</div>
            <div style={styles.priceChange}>
              ↑ +${(currentPrice - auction.startingPrice).toFixed(2)} from start
            </div>
          </div>

          {/* Bid History */}
          {bidHistory.length > 0 && (
            <div style={styles.bidHistory}>
              <div style={styles.bidHistoryTitle}>Recent Bids:</div>
              {bidHistory.map((bid, idx) => (
                <div key={idx} style={styles.bidItem}>
                  <span>{bid.time}</span>
                  <span style={{ color: '#c0a975' }}>${bid.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          {/* AI Verification Section */}
          <div style={styles.aiVerificationContainer}>
            {isLoadingAI ? (
              <div style={styles.spinner} />
            ) : aiVerification ? (
              <div style={styles.aiVerificationText}>
                {aiVerification}
              </div>
            ) : (
              <div style={{ color: '#909090', fontSize: '13px' }}>
                Click "Verify" to analyze authenticity
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={styles.buttonGroup}>
            <button 
              style={{
                ...styles.button,
                ...styles.aiButton
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#d4bb8a';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#c0a975';
              }}
              onClick={handleAIVerification}
              disabled={isLoadingAI}
            >
              {isLoadingAI ? '🤖 Analyzing...' : '🤖 Ask AI Verification'}
            </button>
          </div>

          {/* Navigation */}
          <div style={styles.buttonGroup}>
            <button
              style={{
                ...styles.button,
                ...styles.navButton
              }}
              onClick={goToPreviousAuction}
            >
              ← Previous
            </button>
            <button
              style={{
                ...styles.button,
                ...styles.navButton
              }}
              onClick={goToNextAuction}
            >
              Next →
            </button>
          </div>

          <div style={styles.auctionCounter}>
            Lot {currentAuctionIndex + 1} of {MOCK_AUCTIONS.length}
          </div>
        </div>
      </div>
    </div>
  );
}
