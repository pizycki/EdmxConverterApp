export class ConverterConfiguration {
    sources: ConvertEdmxType[];
    targets: ConvertEdmxType[];
}


export class ConvertEdmxType {
    name: string;
    type: number;
}

export class ConvertModel {

    public sourceType: string;
    public source: string;

    public targetType: string;
    public target: string;
}