import {baseApi} from "@/api/api";
import {MarketPriceHistory, MarketTypes} from "@/types/types";

export const marketsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMarkets:build.query<MarketTypes[],void>({
            query:() => '/markets',
            providesTags: ['Bets'],
        }),
        getMarket:build.query<MarketTypes,string>({
            query:(id) => `/markets/${id}`,
            providesTags:(result,error,id) => [{type:'Bets',id}],
        }),
        getMarketPriceHistory:build.query<MarketPriceHistory[],string>({
            query:(id) => `/markets/${id}/price-history`,
            providesTags:(result,error,id) => [{type:'Bets',id}],
        })

        // placeBet:build.mutation<PlaceBetResponse,PlaceBetRequest>({
        //     query:(body) => ({
        //         url:'/markets/',
        //         method:'POST',
        //         body
        //     }),
        //     invalidatesTags:['Bets','User']
        // })
    })
})


export const { useGetMarketsQuery, useGetMarketQuery, useGetMarketPriceHistoryQuery} = marketsApi