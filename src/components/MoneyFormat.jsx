import NumberFormat from 'react-number-format';

export function MoneyFormat(props) {
    return (
        <NumberFormat
            isNumericString
            thousandSeparator=","
            displayType={'text'}
            decimalSeparator="."
            decimalScale={2}
            fixedDecimalScale={true} {...props} />
    )

}