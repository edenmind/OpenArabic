package com.edenmind.openarabic.repositories

import com.edenmind.openarabic.services.Webservice

class CategoryRepository(private val webservice: Webservice) {
    suspend fun getCategory(userId: String) = webservice.getEndpoint("categories")
}