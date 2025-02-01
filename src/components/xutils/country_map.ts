import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberWithError,
  type CountryCode,
} from 'libphonenumber-js'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import zod from 'zod'

type CountryInfo = {
  code: CountryCode
  prefix: string
  icon: string
}

const getCountryInfoMap = () => {
  const countries = getCountries()
  const countryCodeInfoMap = new Map<string, CountryInfo>()

  for (let i = 0; i < countries.length; i++) {
    const countryInfo = {
      code: countries[i],
      prefix: '',
      icon: '',
    }

    const callingCode = getCountryCallingCode(countries[i])
    if (!callingCode) {
      continue
    }
    countryInfo.prefix = callingCode

    const flag = getUnicodeFlagIcon(countries[i])
    if (flag) {
      countryInfo.icon = flag
    }

    countryCodeInfoMap.set(countries[i], countryInfo)
  }
  return countryCodeInfoMap
}

const checkPhone = (phone: string, info: CountryInfo) => {
  try {
    const phoneNumber = parsePhoneNumberWithError(phone, {
      defaultCountry: info.code as CountryCode,
    })
    const valid = phoneNumber?.isValid()
    return valid
  } catch {
    return false
  }
}

const getZodPhoneCheck = (allowEmpty: boolean) => {
  let numberCheck = zod.string()
  if (allowEmpty) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    numberCheck = zod.string().optional()
  }

  return zod
    .object({
      number: numberCheck,
      country_code: zod.string().min(2),
    })
    .superRefine((v, ctx) => {
      if (allowEmpty && (v.number == undefined || v.number == '')) {
        return true
      } else if ((!allowEmpty && v.number == undefined) || v.number == '') {
        return false
      }

      let valid = false
      try {
        const phoneNumber = parsePhoneNumberWithError(v.number!, {
          defaultCountry: v.country_code as CountryCode,
        })
        valid = phoneNumber?.isValid()
      } catch {
        valid = false
      }

      if (valid == true) {
        return true
      }
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ['number'],
        message: 'Проверьте номер телефона',
      })
    })
}

export { getCountryInfoMap, checkPhone, getZodPhoneCheck }
