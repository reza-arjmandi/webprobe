#include <iostream>
#include <string>
#include <thread>
#include <vector>
#include <algorithm>
#include <cmath>

#include "WebProbeApi.h"

using namespace std;

void generate_probe_x_data();

int main(int argc, char **argv)
{
	INIT_PROBE_ID(probe_x);

	START_WEB_PROBE_API();

	auto thd_x{ thread(generate_probe_x_data) };

	string cmd;
	cin >> cmd;
	while (cmd != "quit")
	{
		cin >> cmd;
	}

	STOP_WEB_PROBE_API();

	return 0;
}

inline void generate_probe_x_data()
{
	vector<float> probe_x_data(65536, 0.0f);
	int idx{0};
	while (true)
	{
		for_each(
			probe_x_data.begin(),
			probe_x_data.end(),
			[&](auto &elem)
			{
				elem = static_cast<float>(sin(idx / 1000.0));
				idx++;
			});
		FEED_GRAPH_PROBE(
			probe_x,
			probe_x_data.data(),
			probe_x_data.size() * sizeof(float));
		this_thread::sleep_for(std::chrono::milliseconds(100));
	}
}