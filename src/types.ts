export type UserType = {
	_id: string;
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	created_at: string;
	token: {
		token: string;
		expiresIn: string;
		token_type: string;
	};
};

export type UserResultType = {
	data: UserType[];
	meta: PageMetaType;
};

export type PageMetaType =
	| {
		page: number;
		take: number;
		itemCount: number;
		pageCount: number;
		hasPreviousPage: boolean;
		hasNextPage: boolean;
	}
	| UncertainObjectType;

export type UncertainObjectType = {
	[key: string]: any;
};