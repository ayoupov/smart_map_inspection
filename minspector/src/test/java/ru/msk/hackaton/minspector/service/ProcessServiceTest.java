package ru.msk.hackaton.minspector.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import ru.msk.hackaton.minspector.dao.repositories.MobileInspectorDirectRepository;
import ru.msk.hackaton.minspector.dao.repositories.TaskRepository;
import ru.msk.hackaton.minspector.dao.repositories.UserRepository;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

class ProcessServiceTest {

    @Mock
    private TaskRepository repository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private MobileInspectorDirectRepository directRepository;

    private ObjectMapper objectMapper = new ObjectMapper();

    private ProcessService processService = new ProcessService(repository, userRepository, directRepository, objectMapper);


    private ObjectMapper mapper = new ObjectMapper();

    @Test
    void saveTask() throws IOException {
        JsonNode jsonNode = mapper.readTree(getResourceFileAsString("3.json"));

        processService.saveTask(jsonNode);

    }

    public static String getResourceFileAsString(String fileName) {
        InputStream is = getResourceFileAsInputStream(fileName);
        if (is != null) {
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));
            return (String) reader.lines().collect(Collectors.joining(System.lineSeparator()));
        } else {
            throw new RuntimeException("resource not found");
        }
    }

    public static InputStream getResourceFileAsInputStream(String fileName) {
        ClassLoader classLoader = ProcessServiceTest.class.getClassLoader();
        return classLoader.getResourceAsStream(fileName);
    }
}