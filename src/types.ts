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

export type DevelopType = {
	_id: string;
	title: string;
	property_name: string;
	property_id: string;
	description: string;
	property_status: string;
	use: string;
	state: string;
	country: string;
	city: string;
	address: string;
	neighborhood: string[];
	estate_features: string[];
	features: [];
	size: string;
	current_price: number;
	previous_price: number;
	type: string;
	units: UnitType[] | undefined;
	images: string[];
	discount: number;
	active: boolean;
	created_at: string;
};

export type UnitType = {
	current_price: number,
	previous_price: number
	title: string
	_id: string
}

export type DevelopResultType = {
	data: DevelopType[];
	meta: PageMetaType;
};

export type DevelopRequestType = {
	_id: string;
	email: string;
	name: string;
	phone_number: string;
	inspection: string;
	quantity: number;
	date: string;
	time: string;
	develop: DevelopType;
};

export type GrowType = {
	_id: string;
	title: string;
	property_name: string;
	description: string;
	property_status: string;
	state: string;
	country: string;
	city: string;
	address: string;
	features: string[],
	size: string;
	current_price: number,
	previous_price: number,
	mortgage_type: string;
	format: string;
	interest: number,
	equity: number,
	repayment_duration: string;
	images: string[],
	discount: number,
	created_at: string
}

export type GrowRequestType = {
	email: string;
	first_name: string;
	last_name: string;
	middle_name: string;
	phone_number: string;
	grow_id: string;
	state_of_residence: string;
	local_government: string;
	primary_source_of_income: string;
	next_of_kin: string;
	next_of_kin_phone_number: string;
	relationship: string;
	nhf_number: string;
	occupation: string;
	mortgage_bank_account_number: string;
	created_at: string;
	_id: string;
	grow: GrowType;
};

export type GrowResultType = {
	data: GrowType[];
	meta: PageMetaType;
};

export type RequestResultType = {
	data: DevelopRequestType[];
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