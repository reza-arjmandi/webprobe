import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import {
  useParams,
  useHistory
} from "react-router-dom";

import GraphSetting from './GraphSetting';
import { 
  DEFAUL_GRAPG_SETTING 
} from '../../constants/settings';

export default function GraphSettingPage(params) {
  let { id } = useParams();
  const {
    graph_settings,
    save_graph_settings,
    update_probe,
    probes
  } = params;
  let history = useHistory();

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }} >
        <GraphSetting
          title={id}
          y_min={graph_settings[id] 
            ? graph_settings[id].y_min 
            : DEFAUL_GRAPG_SETTING.y_min
          }
          y_max={graph_settings[id] 
            ? graph_settings[id].y_max 
            : DEFAUL_GRAPG_SETTING.y_max
          }
          x_min={graph_settings[id] 
            ? graph_settings[id].x_min 
            : DEFAUL_GRAPG_SETTING.x_min
          }
          x_max={graph_settings[id] 
            ? graph_settings[id].x_max 
            : DEFAUL_GRAPG_SETTING.x_max
          }
          height={graph_settings[id] 
            ? graph_settings[id].height 
            : DEFAUL_GRAPG_SETTING.height
          }
          play_speed={graph_settings[id] 
            ? graph_settings[id].play_speed 
            : DEFAUL_GRAPG_SETTING.play_speed
          }
          save={(setting) => {
            save_graph_settings(id, setting)
            history.goBack();
          }}
          back={() => history.goBack()}
          probe_type={probes[id].type}
          probe_data_size={probes[id].data_size}
          update_probe={update_probe}
        />
      </Paper>
    </Container>
  );
}