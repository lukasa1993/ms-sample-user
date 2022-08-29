import fetch from 'node-fetch';
import qs    from 'qs';

export async function byEmail(query) {
  const res = await fetch(`http://ms_sample_company:7702/internal?${qs.stringify(query)}`);

  return res.json();
}

export async function sample() {
  const res = await fetch(`http://ms_sample_company:7702/internal/sample`, {
    method: 'PUT',
  });

  return res.json();
}

