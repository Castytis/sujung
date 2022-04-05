import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentParent } from '../../store/actions/parent-actions';

const ParentAccount = () => {
  const dispatch = useDispatch();
  const currentParent = useSelector((state) => state.parents.parent);

  useEffect(() => {
    dispatch(getCurrentParent());
  }, [getCurrentParent]);

  console.log(currentParent);

  return <div>ParentAccount</div>;
};

export default ParentAccount;
