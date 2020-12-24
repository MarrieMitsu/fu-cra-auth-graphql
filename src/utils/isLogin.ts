import Cookies from "js-cookie";

interface IsLoginProps {
    value(): boolean;
    setLogin(val: boolean): void;
}

export const IsLogin: IsLoginProps = {
    value: function () {
        const cookies = Cookies.get("login");
        if (cookies) {
            return JSON.parse(cookies);
        } else {
            return false;
        }
    },
    setLogin: function (val) {
        const stringBool: string = val ? "true" : "false";
        Cookies.set("login", stringBool);
    },
}