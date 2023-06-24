
export function formatCash(input: number): string {
    return input.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function formatPercentage(input: number): string {
    const percentage = input * 100;
    const decimalPart = percentage % 1;
    let output;
    if (decimalPart === 0) {
        output =  percentage.toFixed(0);
    } else if ((decimalPart * 10) % 1 === 0) {
        output = percentage.toFixed(1);
    } else {
        output = percentage.toFixed(2);
    }
    return output + '%';
}
