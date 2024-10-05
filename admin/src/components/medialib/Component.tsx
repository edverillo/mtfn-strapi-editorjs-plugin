import * as React from "react";

// import { prefixFileUrlWithBackendUrl, useLibrary } from "@strapi/helper-plugin";

// import { useStrapiApp } from "@strapi/strapi/admin";
import { useStrapiApp } from "@strapi/admin/strapi-admin";

// Media Library component needs to be implemented

/*

check package/core/upload
strapi/packages/core/upload

*/


import type { Schema } from "@strapi/types";

interface IMediaLibComponent {
  isOpen: boolean;
  onChange: (files: FormattedMediaFile[]) => void;
  onToggle: (idx: any) => void;
  allowedTypes: string[];
}

interface FormattedMediaFile {
  alternativeText?: string;
  name?: string;
  alt: string;
  url: string;
  width: number | undefined;
  height: number | undefined;
  size: number | undefined;
  mime: string | undefined;
  formats: Record<string, any> | undefined;
}

export const MediaLibComponent: React.FC<IMediaLibComponent> = ({
  isOpen,
  onChange,
  onToggle,
  allowedTypes,
}) => {
  const { components }: any = useStrapiApp('ImageDialog', (state) => state.components);
  const [data, setData] = React.useState<FormattedMediaFile[] | null>(null);

  const MediaLibraryDialog = components["media-library"] as React.ComponentType<any>;

  const handleInputChange = (files: FormattedMediaFile[]) => {
    if (files) {
      setData(files);
    }
  };

  //URL is prefixed with backend URL
  //prefixFileUrlWithBackendUrl(f.url) has been deprecated
  //passing only f.url for the moment

  const handleSelectAssets = (files: FormattedMediaFile[]) => {
    const formattedFiles: any = files.map((f) => ({
      alt: f.alternativeText || f.name,
      url: f.url,
      width: f.width,
      height: f.height,
      size: f.size,
      mime: f.mime,
      formats: f.formats,
    }));
    onChange(formattedFiles);
  };

  if (!isOpen) {
    return null;

  }

  return (
    <MediaLibraryDialog
      allowedTypes={allowedTypes}
      onClose={onToggle}
      onInputMediaChange={handleInputChange}
      onSelectAssets={handleSelectAssets}
    />
    // (<div>Media Library Component</div>)
  );
};
