import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useEffect, useState } from "react";
import axios from "axios";
const ImageSection = () => {
  const { control, watch, setValue } = useFormContext();
  const existingImageUrl = watch("imageUrl");
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (existingImageUrl) {
      const secureImageUrl = existingImageUrl.replace("http://", "https://");

      setFileUrl(secureImageUrl);
      axios
        .get(secureImageUrl, { responseType: "blob" })
        .then((response) => {
          const file = new File([response.data], "existingImage.jpg", {
            type: response.data.type,
          });
          setValue("imageFile", file);
        })
        .catch((error) => {
          console.error("Error fetching the image:", error);
        });
    }
  }, [existingImageUrl, setValue]);

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an Image that will be displayed on your restaurant listing in the
          search results. Adding a new image will overwrite the existing one.
        </FormDescription>
      </div>
      <div className="flex flex-col gap-8 w-[50%]">
        {fileUrl && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={fileUrl}
              className="rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        )}
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="bg-white"
                  onChange={(event) => {
                    const file = event.target.files
                      ? event.target.files[0]
                      : null;
                    if (file) {
                      const newFileUrl = URL.createObjectURL(file);
                      setFileUrl(newFileUrl);
                    }
                    field.onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSection;
