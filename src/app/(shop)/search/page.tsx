import { Suspense } from "react";
import { RealSearchPage } from "@/components/search/search-page";

export default function SearchPage() {
  return (
    <Suspense>
      <RealSearchPage />
    </Suspense>
  );
}
