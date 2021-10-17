cmake_minimum_required(VERSION 3.1)

project(example)
include(${PROJECT_SOURCE_DIR}/vcpkg/scripts/buildsystems/vcpkg.cmake)
find_package(Boost REQUIRED COMPONENTS json thread)
add_executable(${PROJECT_NAME} example.cpp)
target_include_directories(${PROJECT_NAME} 
    PUBLIC 
    ${Boost_INCLUDE_DIRS}
    ${CMAKE_SOURCE_DIR}/backend/cpp_api)
target_compile_features(${PROJECT_NAME} PRIVATE cxx_std_17)
target_link_libraries(${PROJECT_NAME} PRIVATE Boost::json Boost::thread)