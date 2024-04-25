export interface CountryCode {
  flag: string;
  code: string;
  mask: string;
}

export interface CountryCodeProps {
  US: CountryCode;
  VN: CountryCode;
}

export const CountryCodes: CountryCodeProps = {
  US: {
    flag: "us",
    code: "+1",
    mask: "(999) 999-9999",
  },
  VN: {
    flag: "vn",
    code: "+84",
    mask: "0999 999 999",
  },
};
