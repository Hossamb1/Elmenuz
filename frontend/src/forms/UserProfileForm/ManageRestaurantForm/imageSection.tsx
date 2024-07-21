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
      setFileUrl(existingImageUrl);
      axios
        .get(existingImageUrl, { responseType: "blob" })
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

  // fix image update error

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const newFileUrl = URL.createObjectURL(file);
      setFileUrl(newFileUrl);
    }
  };

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
          render={() => (
            <FormItem>
              <FormControl>
                <Input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="bg-white"
                  onChange={handleFileChange}
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
