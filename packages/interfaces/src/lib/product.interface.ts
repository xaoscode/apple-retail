export enum Category {
	// Устройства
	iPhone = "iPhone",
	MacBook = "MacBook",
	iPad = "iPad",
	Watch = "Watch",
	AirPods = "AirPods",

	// Аксессуары
	Charger = "Charger", // Зарядные устройства
	Case = "Case", // Чехлы
	ScreenProtector = "ScreenProtector", // Защитные стекла
	CleaningCloth = "CleaningCloth", // Салфетки для чистки
	Headphones = "Headphones", // Наушники
	Cable = "Cable", // Кабели
	PowerBank = "PowerBank", // Внешние аккумуляторы
	OtherAccessories = "OtherAccessories", // Другие аксессуары
}

export enum SpecificationType {
	RAM = "RAM",
	CPU = "CPU",
	Camera = "Camera",
}

export interface IProduct {
	id?: number;
	manufacturer?: string;
	category: Category;
	name: string;
	model?: string;
	article?: string;
	price: number;
	warranty?: number;
	releaseYear?: number;
	count?: number;
	discount: number;
	titleImg: string;
	images?: string[];
	reviewNum?: number;
	date?: Date;
	color?: string;
	camera?: string;
	simCount?: number;
	memory?: number;
	ram?: number;
	batteryLife?: number;
	matrix?: string;
	screenWidthPx?: number;
	screenHeightPx?: number;
	diagonalInch?: number;
	displayHertz?: number;
	processor?: string;
	cores?: number;
	weight?: number;
	length?: number;
	rating: number;
}
