import qs from 'qs';
import fetch from 'node-fetch';

export async function byEmail(query) {
  const res = await fetch(`http://ms_sample_company:7702/internal?${qs.stringify(query)}`);

  return res.json();
}
