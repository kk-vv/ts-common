export declare const FormatUtils: {
    toUnits(src: number | string | bigint, decimal?: number): bigint;
    fromUnits(src: number | string | bigint, decimal?: number): string;
    deformatNumberToPureString(shitNumber: string): string;
    quantityDivideDecimal(quantity: string, decimal: number): string;
    quantityMultiplyDecimal(quantity: string, decimal: number): string;
    shitNumber(number: string | number, tailValidNumberCount?: number, limitZeroCount?: number): string;
    compactNumber(number: string | number, digits?: number): string;
    fixToSubSymbol(v: string): string;
    revertSubSymbol(v: string): string;
    toTradingViewNumber(text: string | number, tailValidNumberCount?: number, limitZeroCount?: number): string;
    groupBy3Numbers(text: string | number | undefined | null): string;
    removeDecimalTailZeros(text: string): string;
    formatTokenPrice(price: string | number | undefined | null, placeholder?: string): string;
    formatMCap(amount: string | number | undefined | null, symbol?: string, placeholder?: string): string;
    formatQuantity(balance: string | number | undefined | null, placeholder?: string): string;
    formatTokenSupply(supply: string | number): string;
};
