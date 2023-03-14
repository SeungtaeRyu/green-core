package com.chicochico.plant;


import com.chicochico.domain.plant.controller.PlantController;
import com.chicochico.domain.plant.service.PlantService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(PlantController.class)
public class PlantControllerTest {

	@MockBean
	PlantService plantService;

	@Autowired
	MockMvc mvc;


	@Test
	@DisplayName("홈화면에서 식물이름을 검색합니다.")
	public void 홈식물이름검색() throws Exception {
		String str = "선";
		mvc.perform(get("/plant/docs").param("search", str))
			.andExpect(status().isOk());
	}


	@Test
	@DisplayName("도감페이지에서 식물이름을 검색합니다.")
	public void 도감식물이름검색() throws Exception {
		String str = "선";
		mvc.perform(get("/plant/docs").param("search", str))
			.andExpect(status().isOk());
	}


	@Test
	@DisplayName("도감페이지에서 식물 목록을 조회합니다.")
	public void 도감식물목록검색() throws Exception {
		String index = "ㄱ";
		mvc.perform(get("/plant/docs").param("index", index).accept(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk())
			.andExpect(model().attributeExists("plantId"));
	}


	@Test
	@DisplayName("도감페이지에서 식물을 상세 조회합니다.")
	public void 도감식물상세조회() throws Exception {

		mvc.perform(get("/plant/docs/1"))
			.andExpect(status().isOk()).andReturn();
	}

}
