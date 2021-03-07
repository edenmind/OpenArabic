package com.edenmind.openarabic.services

import com.edenmind.openarabic.models.Category
import retrofit2.http.GET
import retrofit2.http.Path


interface Webservice {
    @GET("/api/{endpoint}")
    suspend fun getEndpoint(@Path("endpoint") endpoint: String): Category
}