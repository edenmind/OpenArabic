package com.edenmind.openarabic.ui.home

import androidx.lifecycle.*
import com.edenmind.openarabic.models.Category
import com.edenmind.openarabic.repositories.CategoryRepository
import kotlinx.coroutines.launch

class HomeViewModel(
        savedStateHandle: SavedStateHandle, categoryRepository: CategoryRepository
) : ViewModel() {

    val userId : String = savedStateHandle["uid"] ?: throw IllegalArgumentException("missing user id")

    private val _category = MutableLiveData<Category>()
    val category : LiveData<Category> = _category

    init {
        viewModelScope.launch {
            _category.value = categoryRepository.getCategory(userId)
        }
    }

    val text = "This is a string"
}