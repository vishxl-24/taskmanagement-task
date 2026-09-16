import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const ALLOWED_STATUSES = ['Planned', 'In Progress', 'Complete'];
export const DEFAULT_STATUS = 'Planned';
export const MAX_TITLE_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 500;

const TASKS_COLLECTION = 'tasks';

/**
 * Validate task input
 */
export const validateTaskInput = (title, description = '') => {
  const trimmedTitle = title ? title.trim() : '';
  const trimmedDesc = description ? description.trim() : '';

  if (!trimmedTitle) {
    return { isValid: false, error: 'Task title is required.' };
  }
  if (trimmedTitle.length > MAX_TITLE_LENGTH) {
    return {
      isValid: false,
      error: `Title cannot exceed ${MAX_TITLE_LENGTH} characters.`,
    };
  }
  if (trimmedDesc.length > MAX_DESCRIPTION_LENGTH) {
    return {
      isValid: false,
      error: `Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters.`,
    };
  }
  return { isValid: true, trimmedTitle, trimmedDesc, error: null };
};

/**
 * Create a new task in Firestore
 * @param {string} userId
 * @param {object} taskData { title, description }
 */
export const createTask = async (userId, { title, description }) => {
  if (!userId) {
    return { success: false, error: 'User must be authenticated to create a task.' };
  }

  const validation = validateTaskInput(title, description);
  if (!validation.isValid) {
    return { success: false, error: validation.error };
  }

  try {
    const newTask = {
      title: validation.trimmedTitle,
      description: validation.trimmedDesc,
      status: DEFAULT_STATUS,
      userId: userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, TASKS_COLLECTION), newTask);
    return { success: true, id: docRef.id, error: null };
  } catch (error) {
    console.error('Error creating task in Firestore:', error);
    return {
      success: false,
      error: 'Failed to create task. Please check your network connection and Firestore configuration.',
    };
  }
};

/**
 * Subscribe to current user's tasks in real-time
 * @param {string} userId
 * @param {Function} onData Callback receiving array of tasks
 * @param {Function} onError Callback receiving error message
 * @returns {Function} Unsubscribe function
 */
export const subscribeToUserTasks = (userId, onData, onError) => {
  if (!userId) {
    onData([]);
    return () => {};
  }

  try {
    // Query tasks for authenticated user
    // Note: We order client side if composite index is not built yet to prevent Firestore index errors
    const q = query(
      collection(db, TASKS_COLLECTION),
      where('userId', '==', userId)
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const tasks = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
            // Convert Firestore timestamps to Date JS objects or null
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
            updatedAt: data.updatedAt ? data.updatedAt.toDate() : new Date(),
          };
        });

        // Client side sort descending by createdAt
        tasks.sort((a, b) => b.createdAt - a.createdAt);

        onData(tasks);
      },
      (error) => {
        console.error('Error listening to user tasks:', error);
        if (onError) {
          onError('Failed to load tasks. Check Firestore connection or security rules.');
        }
      }
    );
  } catch (error) {
    console.error('Error setting up task query:', error);
    if (onError) {
      onError('Error setting up task listener.');
    }
    return () => {};
  }
};

/**
 * Update the status of an existing task
 * @param {string} taskId
 * @param {string} newStatus
 */
export const updateTaskStatus = async (taskId, newStatus) => {
  if (!ALLOWED_STATUSES.includes(newStatus)) {
    return { success: false, error: 'Invalid task status selected.' };
  }

  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await updateDoc(taskRef, {
      status: newStatus,
      updatedAt: serverTimestamp(),
    });
    return { success: true, error: null };
  } catch (error) {
    console.error('Error updating task status:', error);
    return {
      success: false,
      error: 'Failed to update task status. Please try again.',
    };
  }
};
