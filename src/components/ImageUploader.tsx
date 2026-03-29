import { useRef } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  images: string[];
  onUpload: (file: File) => void;
}

export function ImageUploader({ images, onUpload }: ImageUploaderProps) {
  const { t } = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(onUpload);
    }
    e.target.value = '';
  };

  return (
    <div className="space-y-3">
      <button
        onClick={() => inputRef.current?.click()}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 px-4 py-8 text-sm text-muted-foreground transition-colors hover:border-primary hover:bg-primary/5"
      >
        <Upload className="h-5 w-5" />
        <span>{t('taskDetail.dragDrop')}</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="hidden"
      />
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((src, idx) => (
            <div key={idx} className="group relative aspect-square overflow-hidden rounded-lg border bg-muted">
              <img src={src} alt={`Proof ${idx + 1}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
