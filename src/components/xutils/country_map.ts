import { getCountries, getCountryCallingCode } from 'libphonenumber-js'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'

const getCountryInfoMap = () => {
  const countries = getCountries()
  const countryCodeInfoMap = new Map<string, CountryInfo>()
  type CountryInfo = {
    code: string
    prefix: string
    icon: string
  }

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

export { getCountryInfoMap }
