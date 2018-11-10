import { staticApps } from './static-apps'
import { isAddress } from './web3-utils'

/*
 * Parse a path and a search query and return a “locator” object.
 *
 * Paths examples:
 *
 * Onboarding:
 *
 * /
 * /setup/template
 * /setup/domain
 * /setup/configure/1
 * /setup/configure/2
 * /setup/registering
 *
 * App:
 *
 * Note: a dao_address can be either of the form /0xcafe… or abc.aragonid.eth
 *
 * /{dao_address}
 * /{dao_address}/settings
 * /{dao_address}/permissions
 * /{dao_address}/0x{app_instance_address}?params={app_params}
 *
 *
 * Available modes:
 *   - home: the screen you see when opening /.
 *   - setup: the onboarding screens.
 *   - app: when the path starts with a DAO address.
 *   - unknown: the mode can’t be determined.
 */
export const parsePath = (pathname, search = '') => {
  const locator = { path: pathname + search }
  const [, ...parts] = pathname.split('/')

  // Home
  if (!parts[0]) {
    return { ...locator, mode: 'home' }
  }

  // Setup
  if (parts[0] === 'setup') {
    const [mode, step = null, ...setupParts] = parts
    return { ...locator, mode, step, parts: setupParts }
  }

  const validAddress = isAddress(parts[0])
  const validDomain = /[a-z0-9]+\.aragonid\.eth/.test(parts[0])

  // Exclude invalid DAO addresses
  if (!validAddress && !validDomain) {
    return { ...locator, mode: 'unknown' }
  }

  // App
  const rawParams = search && search.split('?params=')[1]
  let params = null
  if (rawParams) {
    try {
      params = decodeURIComponent(rawParams)
    } catch (err) {
      console.log('The “params” URL parameter is not valid.')
    }
  }

  const [dao, instanceId, ...appParts] = parts

  const completeLocator = {
    ...locator,
    mode: 'app',
    dao,
    instanceId: instanceId || 'home',
    params,
    parts: appParts,
  }

  return completeLocator
}

// Return a path string for an app instance
export const getAppPath = ({ dao, instanceId = 'home', params } = {}) => {
  const paramsPart = params ? `?params=${encodeURIComponent(params)}` : ``
  if (staticApps.has(instanceId)) {
    return `/${dao}${staticApps.get(instanceId).route}${paramsPart}`
  }
  return `/${dao}/${instanceId}${paramsPart}`
}
