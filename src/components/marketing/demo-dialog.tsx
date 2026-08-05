import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DemoDialog({ triggerClassName }: { triggerClassName?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={triggerClassName}>
          Request demo
          <ArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Badge className="w-fit">Demo</Badge>
          <DialogTitle>Lihat workflow di data operasional kamu.</DialogTitle>
          <DialogDescription>
            Isi detail singkat. Form ini memakai komponen Dialog, Input, Label, dan Button dari
            shadcn.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-1 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="demo-name">Nama</Label>
            <Input id="demo-name" placeholder="Ayu Lestari" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="demo-email">Email kerja</Label>
            <Input id="demo-email" type="email" placeholder="ayu@company.co" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="demo-company">Perusahaan</Label>
            <Input id="demo-company" placeholder="Nama bisnis kamu" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
