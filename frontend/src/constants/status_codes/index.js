export const Successful = 0;
export const MethodNotAllowed = 1;
export const NotFound = 2;
export const RangeNotSatisfiable = 3;
export const ExpectationFailed = 4;
export const UnAvailable = 5;

export const to_str = (status_code) => {
    switch (status_code) {
        case Successful:
            return "Successful";
        case MethodNotAllowed:
            return "MethodNotAllowed";
        case NotFound:
            return "NotFound";
        case RangeNotSatisfiable:
            return "RangeNotSatisfiable";
        case ExpectationFailed:
            return "ExpectationFailed";
        case UnAvailable:
            return "UnAvailable";
        default:
            break;
    }
    return "";
}