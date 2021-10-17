#include <iostream>
#include <string>
#include <thread>
#include <vector>
#include <algorithm>
#include <cmath>

#include "sdrapi/SdrApi.h"

using namespace std;

int main(int argc, char** argv) 
{
	INIT_SDR_API();

	auto thd { 
		thread(
			[&](){
				vector<float> probe_x_data(65536, 0.0f);
				int idx{ 0 };
				while (true)
				{
					for_each(
						probe_x_data.begin(), 
						probe_x_data.end(),
						[&](auto& elem){
							elem = sin(idx / 1000.0);
							idx++;
						}
					);
					FEED_GRAPH_PROBE(
						probe_x, 
						probe_x_data.data(), 
						probe_x_data.size() * sizeof(float)
					);
					this_thread::sleep_for(std::chrono::milliseconds(100));
				}
			}
		)
	};

	string cmd;
	cin >> cmd;
	while (cmd != "quit")
	{
		cin >> cmd;
	}

	return 0;
}