export type UserType = {
	_id: string;
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	created_at: string;
	token: string;
};

export type UserResultType = {
	data: UserType[];
	meta: PageMetaType;
};

export type PageMetaType = {
	totalResults: number;
	resultsPerPage: number;
	totalPages: number;
	currentPage: number;
	pagingCounter: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	prevPage: number | null;
	nextPage: number | null;
};

export type UncertainObjectType = {
	[key: string]: any;
};

export type DevotionalType = {
	_id: string;
	date: Date | string;
	title: string;
	text: string;
	mainText: string;
	content: string;
	confession: string;
	furtherReading: string[];
	oneYearBibleReading: string[];
	twoYearsBibleReading: string[];
	createdBy: string;
	views: number;
	createdAt: string;
	updatedAt: string;
};
