
// https://stackoverflow.com/questions/68657274/create-type-using-objects-value

const HOST = process.env.NEXT_PUBLIC_API
/**
 * Shorthand2 untuk validasi API route
 */
export const API_SHORTHAND = Object.freeze({
  THE_SIMS: {
    CASTAWAY_PRODUCT: `castaway-product`,
    FOUR_PC_HARVESTABLE: `four-pc-harvestable`,
    TWO_PETS_CONSOLE_PRODUCT: `two-pets-console-product`,
    BUSTIN_OUT_CAREER: `bustin-out-career`,
    TWO_CONSOLE_CAREER: `two-console-career`,
    TWO_PETS_CONSOLE_CAREER: `two-pets-console-career`,
  },
  HAY_DAY: {
    PRODUCT: 'product',
    BUILDING: 'building'
  },
  FARM_FRENZY: {
    ONE_PRODUCT: 'one-product',
    TWO_PRODUCT: 'two-product',
    TWO_PIZZA_PRODUCT: 'two-pizza-product',
    THREE_PRODUCT: 'three-product',
  },
  PIZZA_FRENZY: ''
} as const)
/**
 * Untuk link fetching
 */
export const API_ROUTE = Object.freeze({
  DASHBOARD: `${HOST}/dashboard`,
  THE_SIMS: {
    CASTAWAY_PRODUCT: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.CASTAWAY_PRODUCT}`,
    FOUR_PC_HARVESTABLE: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.FOUR_PC_HARVESTABLE}`,
    TWO_PETS_CONSOLE_PRODUCT: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.TWO_PETS_CONSOLE_PRODUCT}`,
    BUSTIN_OUT_CAREER: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.BUSTIN_OUT_CAREER}`,
    TWO_CONSOLE_CAREER: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.TWO_CONSOLE_CAREER}`,
    TWO_PETS_CONSOLE_CAREER: `${HOST}/the-sims/${API_SHORTHAND.THE_SIMS.TWO_PETS_CONSOLE_CAREER}`,
  },
  HAY_DAY: {
    PRODUCT: `${HOST}/hayday/${API_SHORTHAND.HAY_DAY.PRODUCT}`,
    BUILDING: `${HOST}/hayday/${API_SHORTHAND.HAY_DAY.BUILDING}`
  },
  FARM_FRENZY: {
    ONE_PRODUCT: `${HOST}/farm-frenzy/${API_SHORTHAND.FARM_FRENZY.ONE_PRODUCT}`,
    TWO_PRODUCT: `${HOST}/farm-frenzy/${API_SHORTHAND.FARM_FRENZY.TWO_PRODUCT}`,
    TWO_PIZZA_PRODUCT: `${HOST}/farm-frenzy/${API_SHORTHAND.FARM_FRENZY.TWO_PIZZA_PRODUCT}`,
    THREE_PRODUCT: `${HOST}/farm-frenzy/${API_SHORTHAND.FARM_FRENZY.THREE_PRODUCT}`,
  },
  PIZZA_FRENZY: `${HOST}/pizza-frenzy/`,
} as const)
