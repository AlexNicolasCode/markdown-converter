import type { HtmlTagEnum } from "@/enums";

export type SpecialValueProp = {
	name: "href" | "language";
	value: string;
};

export type SpecialValue = {
	id: string;
	type: HtmlTagEnum;
	value: string;
	props: SpecialValueProp[];
};

export type ExtractorResult = {
	value: string;
	props: SpecialValueProp[];
}[];
