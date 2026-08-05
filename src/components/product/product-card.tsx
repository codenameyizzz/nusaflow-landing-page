import { ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/lib/auth-api";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];

  return (
    <Card className="h-full overflow-hidden p-0 transition-colors hover:bg-surface-alt">
      <Link to={`/product/${product.slug}`} className="flex h-full flex-col outline-none">
      <div className="p-3 pb-0">
        <div className="aspect-[4/3] overflow-hidden rounded-[18px] bg-canvas">
          {image ? (
            <img src={image.url} alt={product.title} className="size-full object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center text-mid-gray">
              <ImageIcon className="size-5" />
            </div>
          )}
        </div>
      </div>
      <CardHeader className="flex flex-1 flex-col gap-3 p-5 pt-4">
        <div className="flex min-h-6 items-center justify-between gap-3">
          <Badge variant="secondary" className="max-w-[70%] truncate">
            {product.category}
          </Badge>
          <span className="shrink-0 text-sm font-medium text-ink">{product.priceLabel}</span>
        </div>
        <CardTitle className="line-clamp-2 min-h-[56px] text-[18px] leading-[1.56]">
          {product.title}
        </CardTitle>
        <CardDescription className="line-clamp-3 min-h-[60px]">
          {product.description}
        </CardDescription>
      </CardHeader>
      </Link>
    </Card>
  );
}
