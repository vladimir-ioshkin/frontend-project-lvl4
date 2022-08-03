import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { selectors } from '../../store/slices/channels';

const useValidationSchema = () => {
  const { t } = useTranslation();

  const channels = useSelector(selectors.selectAll);

  return useMemo(() => yup.object({
    name: yup.string()
      .required(t('modal.requiredError'))
      .notOneOf(channels.map(({ name }) => name), t('modal.existError')),
  }), [channels, t]);
};

export default useValidationSchema;
