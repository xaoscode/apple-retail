import { handlers } from "@/auth";
import { searchProducts } from "../../search";
import { NextResponse } from "next/server";

export const { GET, POST } = handlers;
