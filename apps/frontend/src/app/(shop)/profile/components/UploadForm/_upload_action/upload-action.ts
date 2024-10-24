"use server";
import { z } from "zod";
import { uploadService } from "./upload-service";
import { UploadActionState } from "./initial-state";

const MAX_FILE_SIZE = 500000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const schemaUpload = z.object({
	image: z
		.any()
		.refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
		.refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Only .jpg, .jpeg, .png and .webp formats are supported."),
});

export async function uploadAction(prevState: UploadActionState, formData: FormData) {
	console.log("Hello from upload acton!");
	const validatedFields = schemaUpload.safeParse({
		image: formData.get("image"),
	});
	if (!validatedFields.success) {
		return {
			...prevState,
			zodErrors: validatedFields.error.flatten().fieldErrors,
			apiErrors: "",
			message: "Failed to upload.",
		};
	}
	const responseData = await uploadService(validatedFields.data);
	console.log(responseData);
	if (!responseData) {
		return {
			...prevState,
			apiErrors: "",
			zodErrors: {},
			message: "Ops! Something went wrong. Please try again.",
		};
	}

	if (responseData.statusCode === 400) {
		return {
			...prevState,
			apiErrors: responseData.message,
			zodErrors: {},
			message: "Failed to Register.",
		};
	}

	return {
		zodErrors: {},
		apiErrors: "",
		message: "Image uploaded successfully.",
		error: {},
		data: "ok",
	};
}
