import useSWR, {
  MutatorCallback,
  MutatorOptions,
  SWRResponse,
  useSWRConfig,
} from 'swr'
import useSWRMutation, { type SWRMutationResponse } from 'swr/mutation'

type Fn = (...args: any[]) => any

export const getKey = <T extends { name: string }, T1 extends Fn>(
  Service: T,
  handle: T1,
  params?: Parameters<T1>[0],
) => {
  return (
    Service?.name +
    handle?.name +
    (params ? new URLSearchParams(params).toString() : '')
  )
}

type OptsType = {
  errorRetryInterval?: number
  dedupingInterval?: number
  errorRetryCount?: number
  isPaused?: () => boolean
  onSuccess?: Fn
  refreshInterval?: number
  addedKey?: string
  revalidateIfStale?: boolean
  revalidateOnFocus?: boolean
  revalidateOnReconnect?: boolean
  revalidateOnMount?: boolean
  refreshWhenOffline?: boolean
  refreshWhenHidden?: boolean
  onError?: Fn
}

export function useSwr<T extends { name: string }, T1 extends Fn>(
  Service: T,
  handle: T1,
  params: Parameters<T1 | any>[0],
  opts?: OptsType,
): SWRResponse<Awaited<ReturnType<T1>>> & {
  isLoading: boolean
} {
  const key = getKey(Service, handle, params)
  const { mutate, ...rest } = useSWR(
    key,
    () => {
      return handle(params)
    },
    {
      errorRetryInterval: 1000 * 1,
      dedupingInterval: 1000 * 5,
      errorRetryCount: 5,
      // refreshWhenHidden: true, // TODO: if it's error, checking
      ...opts,
    },
  )
  return { ...rest, mutate, isLoading: !rest.error && !rest.data }
}

export function useMutate<T extends { name: string }, T1 extends Fn>(
  Service: T,
  handle: T1,
  params?: Parameters<T1>[0],
) {
  const { mutate } = useSWRConfig()

  const keyCache = getKey(Service, handle, params)

  type Response = Awaited<ReturnType<T1>> | void

  return (
    data?: Response | Promise<Response> | MutatorCallback<Response>,
    opts?: boolean | MutatorOptions<Response>,
  ) => {
    return mutate(keyCache, data, opts)
  }
}

export function useSwrMutation<T extends { name: string }, T1 extends Fn>(
  Service: T,
  handle: T1,
  params: Parameters<T1 | any>[0],
  opts?: OptsType,
): SWRMutationResponse<Awaited<ReturnType<T1>>> {
  const key = getKey(Service, handle, params)
  const res = useSWRMutation(
    key,
    () => {
      return handle(params)
    },
    {
      errorRetryInterval: 1000 * 1,
      dedupingInterval: 1000 * 5,
      errorRetryCount: 5,
      ...opts,
    },
  )
  return res
}
