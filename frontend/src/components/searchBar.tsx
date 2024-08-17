import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type searchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: searchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
};

const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {
  const form = useForm<searchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({
      searchQuery,
    });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });
    if (onReset) {
      onReset();
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center max-sm:flex-1 basis-3/4 max-h-[56px] gap-3 justify-between flex-row bg-white border-2 rounded-full p-2 m-4 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <div className="flex gap-2 items-center flex-1">
          <Search
            strokeWidth={2.5}
            size={30}
            className="ml-1 text-orange-500 hidden md:block"
          />
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    className="border-none shadow-none text-xl focus-visible:ring-0"
                    placeholder={placeHolder}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleReset}
            type="button"
            variant="outline"
            className="rounded-full max-md:hidden"
          >
            Reset
          </Button>

          <Button type="submit" className="rounded-full bg-orange-500">
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchBar;
