import { Link } from "react-router-dom";
import Button from "@/components/common/Button";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="container not-found">
      <span className="not-found__lot mono">LOT 404</span>
      <h1>This lot isn't on the floor.</h1>
      <p>The auction or page you're looking for doesn't exist or has been removed.</p>
      <Link to="/">
        <Button>Back to the auction floor</Button>
      </Link>
    </div>
  );
}
