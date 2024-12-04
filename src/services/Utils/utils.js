import { French } from "flatpickr/dist/l10n/fr.js"
import { createMRTColumnHelper } from "material-react-table"
export const loadingParams = 'isLoading'

export const pickerOptions = {
    locale: {
      ...French,
      months: {
        ...French.months
      }
    },
    dateFormat: "d/m/Y",
    mode: "range"
  }

export const getExercices = (nbr, start) => {
    nbr = typeof nbr !== 'undefined' ? nbr : 7
    start = typeof start !== 'undefined' ? start : -5
    const yearNow = new Date().getFullYear()

    const exos = []
    for (let i = 0; i < nbr; i++) {
        exos.push(yearNow + start + i)
    }

    return exos
}

export const moment_fr = {
  months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
  monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
  monthsParseExact : true,
  weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
  weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
  weekdaysParseExact : true,
  longDateFormat : {
      LT : 'HH:mm',
      LTS : 'HH:mm:ss',
      L : 'DD/MM/YYYY',
      LL : 'D MMMM YYYY',
      LLL : 'D MMMM YYYY HH:mm',
      LLLL : 'dddd D MMMM YYYY HH:mm'
  },
  calendar : {
      sameDay : '[Aujourd’hui à] LT',
      nextDay : '[Demain à] LT',
      nextWeek : 'dddd [à] LT',
      lastDay : '[Hier à] LT',
      lastWeek : 'dddd [dernier à] LT',
      sameElse : 'L'
  },
  relativeTime : {
      future : 'dans %s',
      past : 'il y a %s',
      s : 'quelques secondes',
      m : 'une minute',
      mm : '%d minutes',
      h : 'une heure',
      hh : '%d heures',
      d : 'un jour',
      dd : '%d jours',
      M : 'un mois',
      MM : '%d mois',
      y : 'un an',
      yy : '%d ans'
  },
  dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
  ordinal (number) {
      return number + (number === 1 ? 'er' : 'e')
  },
  meridiemParse : /PD|MD/,
  isPM (input) {
      return input.charAt(0) === 'M'
  },
  meridiem (hours) {
      return hours < 12 ? 'PD' : 'MD'
  },
  week : {
      dow : 1,
      doy : 4
  }
}
/**
 * 
 * @param {string} label 
 * @param {string} value 
 * @returns {{
 * label: string,
 * value: string
 * }}
 */
export const selectOptionsParser = (label, value) => ({
    label,
    value
})


/**
 * 
 * @param {number} len 
 * @returns {boolean}
 */
Array.prototype.isLenEqual = function (len) {
    return this.length === len
}

Array.prototype.isLenGreatThan = function (len, strict) {
    return strict ? this.length > len : this.length >= len 
}

Array.prototype.isLenLessThan = function (len, strict) {
    return strict ? this.length < len : this.length <= len
}


export const columnHelper = createMRTColumnHelper()


export const typeSaise = {
    su: {
        value: 0,
        libelle: 'SU',
        color: 'warning'
    },
    compta: {
        value: 1,
        libelle: 'Compta',
        color: 'danger'
    }
}

export const capitalizeFirstLetter = (string) => {
    if (string) {
        return string[0].toUpperCase() + string.slice(1)
    }
    return string
}