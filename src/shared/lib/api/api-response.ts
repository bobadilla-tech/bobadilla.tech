import { NextResponse } from "next/server";
import type { ZodError } from "zod";

interface SuccessResponse<T = unknown> {
	success: true;
	message?: string;
	data?: T;
}

interface FieldError {
	field: string;
	message: string;
}

interface ErrorResponse {
	success: false;
	message: string;
	errors?: FieldError[];
}

export function successResponse<T>(
	data?: T,
	message?: string,
	status = 200
): NextResponse<SuccessResponse<T>> {
	return NextResponse.json(
		{
			success: true,
			...(message && { message }),
			...(data && { data }),
		},
		{ status }
	);
}

export function errorResponse(
	message: string,
	status = 500
): NextResponse<ErrorResponse> {
	return NextResponse.json(
		{
			success: false,
			message,
		},
		{ status }
	);
}

export function validationErrorResponse(
	error: ZodError,
	message = "Invalid request data"
): NextResponse<ErrorResponse> {
	const fieldErrors: FieldError[] = error.issues.map((issue) => ({
		field: issue.path.join(".") || "root",
		message: issue.message,
	}));

	return NextResponse.json(
		{
			success: false,
			message,
			errors: fieldErrors,
		},
		{ status: 400 }
	);
}
