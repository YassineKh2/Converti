import { Github, Info } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>
              Created by <strong>Yassine Khemiri</strong>
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Info className="h-3 w-3" />
            <span>v1.0.0</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild className="h-7 text-xs" size="sm" variant="ghost">
            <a
              href="https://github.com/YassineKh2/Converti"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="h-3 w-3 mr-1" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
