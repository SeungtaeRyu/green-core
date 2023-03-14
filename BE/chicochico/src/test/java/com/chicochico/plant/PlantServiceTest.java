package com.chicochico.plant;


import com.chicochico.domain.plant.entity.PlantEntity;
import com.chicochico.domain.plant.repository.PlantRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
public class PlantServiceTest {

	@Mock
	private PlantRepository plantRepository;


	@Test
	public void 식물이름검색() {
		List<PlantEntity> list = new ArrayList<>();

		PlantEntity plant = PlantEntity.builder()
			.id(1L).name("선인장").build();
		list.add(plant);

		PlantEntity plant2 = PlantEntity.builder()
			.id(2L).name("선인장").build();
		list.add(plant2);

		PageRequest pageable = PageRequest.of(0, 3);
		Page<PlantEntity> page = new PageImpl<>(list, pageable, 5);

		when(plantRepository.findAllByNameContaining("선", pageable)).thenReturn(page);
	}


	@Test
	public void 식물인덱스검색() {
		List<PlantEntity> list = new ArrayList<>();

		PlantEntity plant = PlantEntity.builder()
			.id(1L).name("선인장").build();
		list.add(plant);

		PlantEntity plant2 = PlantEntity.builder()
			.id(2L).name("선인장").build();
		list.add(plant2);

		PageRequest pageable = PageRequest.of(0, 3);
		Page<PlantEntity> page = new PageImpl<>(list, pageable, 5);

		when(plantRepository.findAllByNameContaining("ㅅ", pageable)).thenReturn(page);

	}

}
