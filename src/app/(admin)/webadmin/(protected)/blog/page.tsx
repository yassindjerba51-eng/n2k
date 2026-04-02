"use client";

import { useState } from "react";
import { mockBlogPosts, type MockBlogPost } from "@/lib/admin-mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Calendar,
  Pencil,
  Plus,
  Trash2,
  Image as ImageIcon,
  Tag,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

export default function BlogPage() {
  const [editingPost, setEditingPost] = useState<MockBlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Blog
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Articles scientifiques du Dr Mahmoud Nafeti
          </p>
        </div>
        <Button
          className="bg-[#0A2540] hover:bg-[#0A2540]/90"
          onClick={() => setIsCreating(true)}
        >
          <Plus className="w-4 h-4 me-1.5" />
          Nouvel article
        </Button>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockBlogPosts.map((post) => (
          <Card
            key={post.id}
            className="border-slate-200/80 shadow-sm bg-white hover:shadow-md transition-shadow overflow-hidden group"
          >
            {/* Cover Image */}
            {post.coverImage && (
              <div className="relative h-40 bg-slate-100 overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.titleFr}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-2.5 start-3 flex items-center gap-1.5">
                  <Badge className="bg-white/90 text-slate-700 backdrop-blur-sm text-[10px] font-semibold border-0">
                    <Calendar className="w-3 h-3 me-1" />
                    {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Badge>
                </div>
              </div>
            )}

            <CardContent className="p-4">
              {/* Title */}
              <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 mb-2">
                {post.titleFr}
              </h3>

              {/* Content preview */}
              <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                {post.contentFr}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {post.tags.split(", ").map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 bg-slate-50 text-slate-500 border-slate-200"
                  >
                    <Tag className="w-2.5 h-2.5 me-0.5" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Multilingual indicators */}
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Langues :</span>
                {["FR", "EN", "AR"].map((lang) => (
                  <span
                    key={lang}
                    className="flex items-center justify-center w-6 h-5 rounded bg-emerald-50 text-emerald-700 text-[9px] font-bold"
                  >
                    {lang}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <Separator className="mb-3" />
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-slate-500 hover:text-slate-800 h-7"
                  onClick={() => setEditingPost(post)}
                >
                  <Pencil className="w-3 h-3 me-1" />
                  Modifier
                </Button>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-slate-500 hover:text-slate-800 h-7 w-7 p-0"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 h-7 w-7 p-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit/Create Blog Post Dialog */}
      <Dialog
        open={!!editingPost || isCreating}
        onOpenChange={() => {
          setEditingPost(null);
          setIsCreating(false);
        }}
      >
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPost ? `Modifier — ${editingPost.titleFr}` : "Nouvel article"}
            </DialogTitle>
            <DialogDescription>
              Éditez le contenu dans les trois langues (FR, EN, AR)
            </DialogDescription>
          </DialogHeader>

          <div key={editingPost?.id ?? "new-post"} className="space-y-6 mt-4">
            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-slate-500">Slug</Label>
                <Input
                  defaultValue={editingPost?.slug ?? ""}
                  placeholder="mon-article-titre"
                  className="bg-white"
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500">Tags (séparés par des virgules)</Label>
                <Input
                  defaultValue={editingPost?.tags ?? ""}
                  placeholder="tag1, tag2, tag3"
                  className="bg-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs text-slate-500">Image de couverture (URL)</Label>
              <Input
                defaultValue={editingPost?.coverImage ?? ""}
                placeholder="https://images.unsplash.com/..."
                className="bg-white"
              />
            </div>

            <Separator />

            {/* Titles - multilingual */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-700">Titres</h4>
              <div>
                <Label className="text-xs text-slate-500">Français</Label>
                <Input defaultValue={editingPost?.titleFr ?? ""} className="bg-white" />
              </div>
              <div>
                <Label className="text-xs text-slate-500">English</Label>
                <Input defaultValue={editingPost?.titleEn ?? ""} className="bg-white" />
              </div>
              <div>
                <Label className="text-xs text-slate-500">العربية</Label>
                <Input defaultValue={editingPost?.titleAr ?? ""} className="bg-white" dir="rtl" />
              </div>
            </div>

            <Separator />

            {/* Content - multilingual */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-700">Contenu</h4>
              <div>
                <Label className="text-xs text-slate-500">Français</Label>
                <Textarea
                  defaultValue={editingPost?.contentFr ?? ""}
                  className="bg-white min-h-[100px]"
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500">English</Label>
                <Textarea
                  defaultValue={editingPost?.contentEn ?? ""}
                  className="bg-white min-h-[100px]"
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500">العربية</Label>
                <Textarea
                  defaultValue={editingPost?.contentAr ?? ""}
                  className="bg-white min-h-[100px]"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingPost(null);
                  setIsCreating(false);
                }}
              >
                Annuler
              </Button>
              <Button
                className="bg-[#0A2540] hover:bg-[#0A2540]/90"
                onClick={() => {
                  setEditingPost(null);
                  setIsCreating(false);
                }}
              >
                <CheckCircle2 className="w-4 h-4 me-1.5" />
                {editingPost ? "Enregistrer" : "Publier"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
