const calcDiscount = (price: number, percentage: number): number => {
    return price - (price * percentage / 100)
}