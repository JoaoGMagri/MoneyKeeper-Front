export const normalizeValueNumber = (value: string | undefined) => {
    if (!value) return ''
    if (value === "NaN") return '';
    console.log(value);
    value = value + '';
    value = value.replace(/[\D]+/g, '');
    value = value + '';
    value = value.replace(/([0-9]{2})$/g, ",$1");

    if (value.length )

    if (value.length > 6) {
        value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    return value;
}

export const formaterValueNumber = (value: any) => {
    if (!value) return ''

    return value.replace(".","").replace(",",".");
}