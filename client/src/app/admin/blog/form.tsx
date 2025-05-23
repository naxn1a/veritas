"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Select from "@/components/build/Select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import MarkdownEditor from "@/components/markdown/MarkdownEditor";
import Fetch from "@/utils/Fetch";
import { useState, useEffect } from "react";
import { DatePicker } from "@/components/ui/datepicker";
import { redirect } from "next/navigation";
import { notify } from "@/utils/Notify";
interface BlogFormProps {
  core?: {
    id: string;
    title: string;
    description: string;
    image: string;
    author: string;
    category: string;
    content: string;
  };
}

interface FieldDataType {
  name: (typeof FieldData)[number]["name"];
  type: string;
}

export function BlogForm({ core }: BlogFormProps) {
  const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().optional(),
    image: z.string().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    content: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: core?.title || "",
      description: core?.description || "",
      image: core?.image || "",
      author: core?.author || "",
      category: core?.category || "",
      content: core?.content || "",
    },
  });
  const [options, setOptions] = useState<{
    [key in (typeof FieldData)[number]["name"]]?: {
      value: string;
      label: string;
    }[];
  }>({});
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await Fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category`
      );
      if (res && res.status === "ok") {
        setOptions((prev) => ({
          ...prev,
          category: res.data.map((item: { id: string; name: string }) => ({
            value: item.id,
            label: item.name,
          })),
        }));
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const API =
      `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${
        core?.id ? core!.id : ""
      }` || "";

    const res = await Fetch(API!, {
      method: core?.id ? "PUT" : "POST",
      body: {
        title: values.title,
        description: values.description,
        image: values.image,
        author: values.author,
        category: values.category,
        content: info,
      },
    });

    if (res && res.status !== "ok") {
      return notify.error(res.message);
    }

    redirect("/admin/blog");
  };

  const [info, setInfo] = useState(core?.content || "");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          {FieldData.map((data: FieldDataType, index: number) => (
            <FormField
              key={index}
              control={form.control}
              name={data.name}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="capitalize">{data.name}</FormLabel>
                    <FormControl>
                      {data.type === "text" ? (
                        <Input {...field} />
                      ) : data.type === "tel" ? (
                        <PhoneInput {...field} defaultCountry="TH" />
                      ) : data.type === "date" ? (
                        <DatePicker
                          {...field}
                          value={
                            field.value
                              ? new Date(field.value).toISOString()
                              : ""
                          }
                          onChange={field.onChange}
                        />
                      ) : data.type === "select" ? (
                        <Select
                          {...field}
                          defaultValue={field.value}
                          onValueChange={(text: string) => {
                            if (field.value !== text) {
                              field.onChange(text);
                            }
                          }}
                          options={options[data.name]}
                        />
                      ) : data.type === "mdx" ? (
                        <MarkdownEditor
                          className="w-full md:col-span-2 rounded-lg text-center"
                          data={info}
                          setData={setInfo}
                        />
                      ) : null}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-end space-x-2 pt-6">
          <Button type="submit" className="cursor-pointer">
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
}

const FieldData = [
  {
    name: "title",
    type: "text",
  },
  {
    name: "description",
    type: "text",
  },
  {
    name: "image",
    type: "text",
  },
  {
    name: "category",
    type: "select",
  },
  {
    name: "author",
    type: "text",
  },
  {
    name: "content",
    type: "mdx",
  },
] as const;
