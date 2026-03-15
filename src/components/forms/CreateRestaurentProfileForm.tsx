"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "@/lib/auth";
import { createRestaurentMutation } from "@/actions/restaurent";

const CUISINE_TYPE = [
  { id: "Veg", label: "Veg" },
  { id: "Non-Veg", label: "Non-Veg" },
  { id: "Eggeterian", label: "Eggeterian" },
] as const;

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "the minimum length of the name is 3")
    .max(30, "the maximum length of the name is 30"),
  description: z
    .string()
    .trim()
    .min(10, "the minimum length of the description is 10")
    .max(100, "the maximum length of the description is 100"),
  cuisine_type: z
    .array(z.string())
    .min(1, "the minimum number of cuisine types is 1")
    .refine(
      (v) => v.every((v) => CUISINE_TYPE.some((c) => c.id === v)),
      "the cuisine type is not valid",
    ),
  available_tables: z
    .number()
    .min(1, "the minimum number of tables is 1")
    .max(100, "the maximum number of tables allowed is 100"),
  logo_url: z.url("the logo url is not valid").trim(),
  cover_image_url: z.url("the cover image url is not valid"),
});

const CreateRestaurentProfileForm = () => {
  const { data: session } = useSession();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["create-restaurent"],
    mutationFn: async (data: z.infer<typeof formSchema>) =>
      await createRestaurentMutation(data, session?.user.id as string),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      cuisine_type: [] as string[],
      available_tables: 1,
      logo_url: "",
      cover_image_url: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const res = formSchema.parse(value);
      console.log(res);
      console.log(res.available_tables, typeof res.available_tables);

      const mutation = await mutateAsync(res);
      console.log(mutation);
    },
  });

  // if (!session) {
  //   router.push("http://localhost:3000");
  // }

  return (
    <div>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Create Restaurent Profile</CardTitle>
          <CardDescription>
            Help us by letting know about the restuarent for better targeting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="bug-report-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            {/* name */}
            <FieldGroup>
              <form.Field name="name">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Enter restaurent name"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* description */}
              <form.Field name="description">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="A brief description of your restaurant, its ambiance, and specialties."
                          rows={6}
                          className="min-h-24 resize-none"
                          aria-invalid={isInvalid}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums">
                            {field.state.value.length}/100 characters
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      <FieldDescription>
                        Give potential customers a taste of what to expect.
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* logo url */}
              <form.Field name="logo_url">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Logo url</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="url logo "
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/*  cover url */}
              <form.Field name="cover_image_url">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Cover Image</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Enter cover image URL"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* cuisine type */}
              <form.Field name="cuisine_type" mode="array">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <FieldGroup>
                      <FieldSet data-invalid={isInvalid}>
                        <FieldLegend variant="label">Cuisine Type</FieldLegend>
                        <FieldDescription>
                          Select the cuisine type
                        </FieldDescription>
                        <FieldGroup data-slot="checkbox-group">
                          {CUISINE_TYPE.map((val) => (
                            <Field
                              key={val.id}
                              orientation="horizontal"
                              data-invalid={isInvalid}
                            >
                              <Checkbox
                                id={`form-tanstack-checkbox-${val.id}`}
                                name={field.name}
                                aria-invalid={isInvalid}
                                checked={field.state.value.includes(val.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.pushValue(val.id);
                                  } else {
                                    const index = field.state.value.indexOf(
                                      val.id,
                                    );
                                    if (index > -1) {
                                      field.removeValue(index);
                                    }
                                  }
                                }}
                              />
                              <FieldLabel
                                htmlFor={`form-tanstack-checkbox-${val.id}`}
                                className="font-normal"
                              >
                                {val.label}
                              </FieldLabel>
                            </Field>
                          ))}
                        </FieldGroup>
                      </FieldSet>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldGroup>
                  );
                }}
              </form.Field>

              {/*  tables */}
              <form.Field name="available_tables">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Available Tables
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(e.target.valueAsNumber)
                        }
                        aria-invalid={isInvalid}
                        placeholder="Enter number of table available"
                        autoComplete="off"
                        type="number"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="bug-report-form"
              disabled={isPending}
              variant={isPending ? "secondary" : "default"}
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateRestaurentProfileForm;
