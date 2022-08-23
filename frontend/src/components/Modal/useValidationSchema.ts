import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { TypedSchema } from 'yup/lib/util/types';
import { selectors } from '../../store/slices/channels';
import { Channel } from '../../types';

const useValidationSchema = (): TypedSchema => {
  const { t } = useTranslation();

  const channels: Channel[] = useSelector(selectors.selectAll);

  return useMemo(() => yup.object({
    name: yup.string()
      .required(t('modal.requiredError'))
      .notOneOf(channels.map(({ name }) => name), t('modal.existError')),
  }), [channels, t]);
};

export default useValidationSchema;
